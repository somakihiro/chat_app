class FriendshipsController < ApplicationController

  def create
    @user = User.find(params[:to_user_id])
    # current_userとすでに友達であればrootにリダイレクト、友達でないなら友達に追加
    if current_user.friend?(@user)
      redirect_to root_path
    else
      current_user.make_friend_with(@user)
      redirect_to root_path
    end
  end

  def destroy
    # @user = current_user.from_user_friendships.find_by(to_user_id: params[:id]) ? current_user.from_user_friendships.find_by(to_user_id: params[:id]).to_user : current_user.to_user_friendships.find_by(from_user_id: params[:id]).from_user
    friendship = current_user.find_friendship_for(params[:id])
    current_user.break_off_friend(friendship)
    redirect_to root_path
  end

end