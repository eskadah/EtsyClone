class Listing < ActiveRecord::Base
	if Rails.env.development?
		has_attached_file :image,:styles =>{:medium => '200x', :thumb => '100x100>'},:default_url=>'default@2x.png'
	else
		has_attached_file :image,:styles =>{:medium => '200x', :thumb => '100x100>'},:default_url=>'default@2x.png',
		:storage => :dropbox,
		:dropbox_credentials => Rails.root.join('config/dropbox.yml'),
		:path => ":style/:id_:filename"
	end

   validates_presence_of(:name,:description,:price)
   validates_numericality_of(:price,:greater_than => 0)

   belongs_to :user

   default_scope order('created_at DESC')
end
