class Api::UsersController < ApplicationController
  def search
    @users = User.where.not(id: current_user.id)
    # @users = User.all
    # render json: @users.as_json(include: :messages)
    render json: @users
  end

  def index
    # @users = User.where.not(id: current_user.id)
    @users = current_user.friends_all
    render json: @users.as_json(include: :messages)
  end

  def me
    render json: current_user
  end
end