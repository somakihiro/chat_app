class User < ActiveRecord::Base
  has_many :messages
  has_many :from_user_friendships, class_name: 'Friendship', foreign_key: 'from_user_id',
           dependent: :destroy
  has_many :friends_from_user, through: :from_user_friendships, source: 'to_user'
  has_many :to_user_friendships, class_name: 'Friendship', foreign_key: 'to_user_id',
           dependent: :destroy
  has_many :friends_to_user, through: :to_user_friendships, source: 'from_user'

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :name, presence: true, uniqueness: true

  def set_image(file)
    return if file.nil?
    file_name = file.original_filename
    File.open("public/user_images/#{file_name}", "wb") {|f|f.write(file.read)}
    self.image = file_name
  end

  def friends(user)
    from_user_friendships.find_or_create_by(to_user_id: user.id)
  end

  def friends_all
    friends_to_user + friends_from_user
  end

  # def friends_all_plus
  #   friends_to_user + friends_from_user + current_user
  # end

  def from_friend?(user)
    friends_from_user.include?(user)
  end

  def to_friend?(user)
    friends_to_user.include?(user)
  end
end