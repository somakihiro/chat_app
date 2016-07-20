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
    render json: @users
  end

  def me
    render json: current_user.as_json(include: :messages)
  end

  # def all
  #   @users = User.all
  #   render json: @users.as_json(include: :messages)
  # end

  def show
    @user = User.find(params[:id])
    render json: @user.as_json(include: :messages)
  end

  # def users_message
  #   @users = current_user.friends_all_plus
  #   render json: @users.as_json(include: :messages)
  # end
end