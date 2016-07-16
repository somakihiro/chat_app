class FriendshipsController < ApplicationController

  def create
    @user = User.find(params[:to_user_id])
    # current_userとすでに友達であればrootにリダイレクト、友達でないなら友達に追加
    if current_user.friend?(@user)
      redirect_to root_path
    else
      current_user.friend(@user)
      redirect_to root_path
    end
  end

  def destroy
  end
end