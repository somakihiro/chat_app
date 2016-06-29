class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :name, presence: true

  def set_image(file)
    return if file.nil?
    file_name = file.original_filename
    File.open("public/user_images/#{file_name}", "wb") {|f|f.write(file.read)}
    self.image = file_name
  end
end
