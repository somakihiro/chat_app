class Message < ActiveRecord::Base
  belongs_to :user

  validates :body, presence: true, if: 'image.nil?'

  def set_image(file)
    return if file.nil?
    file_name = Time.zone.now.to_i.to_s + file.original_filename
    binding.pry
    File.open("public/message_images/#{file_name}", "wb") {|f|f.write(file.read)}
    self.image = file_name
  end
end
