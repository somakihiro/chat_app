class Api::UsersController < Api::ApplicationController
  def search
    @users = User.all
    render json: @users
  end
end