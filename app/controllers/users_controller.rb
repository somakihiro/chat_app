class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def search
    @users = User.all
  end
end
