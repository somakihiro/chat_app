class Api::UsersController < ApplicationController
  def search
    @users = User.where.not(id: current_user.id)
    @search_string = params[:search_string]
    if !@search_string || @search_string == ""
      @search_users = []
    else
      @search_users = @users.where("name like ?", "%#{@search_string}%")
    end
    render json: @search_users
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
    @messages = @user.messages.where(to_user_id: current_user.id)
    @user_json = @user.as_json(include: [:accesses])
    @user_json[:messages] = @messages
    render json: @user_json
  end

  def create
      @user_access = current_user.accesses.create(to_user_id: params[:to_user_id], last_access: params[:last_access])
      render json: @user_access
  end
end