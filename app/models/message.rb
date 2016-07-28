class Message < ActiveRecord::Base
  belongs_to :user

  def set_image(file)
    return if file.nil?
    file_name = file.original_filename
    File.open("public/message_images/#{file_name}", "wb") {|f|f.write(file.read)}
    self.image = file_name
  end

  def set_to_user_id(id)
    self.to_user_id = id
  end
end
