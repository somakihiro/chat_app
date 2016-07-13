class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def search
    @users = User.where.not(id: current_user.id)
    # @users = User.all
  end
end
