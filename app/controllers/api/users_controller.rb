class Api::UsersController < ApplicationController
  def search
    @users = User.where.not(id: current_user.id)
    render json: @users
  end

  def index
    @users = current_user.friends_all.as_json(include: [:messages, :accesses])
    render json: @users
  end

  def me
    render json: current_user.as_json(include: :messages)
  end

  def show
    @user = User.find(params[:id])
    render json: @user.as_json(include: [:messages, :accesses])
  end

  def create
      @user_access = current_user.accesses.create(to_user_id: params[:to_user_id], last_access: params[:last_access])
      render json: @user_access
  end
end