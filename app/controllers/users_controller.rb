class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.find(params[:id])
  end

  def search
    @users = User.where.not(id: current_user.id)
    # @users = User.all
  end
end
