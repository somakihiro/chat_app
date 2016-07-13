class Api::FriendshipsController < ApplicationController
  def index
   @user = Friendship.all
   render json: @user
  end

  def create
    @user = User.find(params[:to_user_id])
    current_user.friends(@user)
    render json: { friendship: @user }
  end
end