class Api::UsersController < ApplicationController
  def search
    @users = User.where.not(id: current_user.id)
    # @users = User.all
    # render json: @users.as_json(include: :messages)
    render json: @users
  end

  def index
    # @users = User.where.not(id: current_user.id)
    @users = current_user.friends_all.as_json(include: [:messages, :accesses])
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
    render json: @user.as_json(include: [:messages, :accesses])
  end

  def create
    # binding.pry
    # @user_access = Access.find(params[:id])
    # @user_id = @user_access.user_id
    # @to_user_id = @user_access.to_user_id
    # if @user_id && @to_user_id
    #   redirect_to :action => 'update'
    # else
    #   @last_access = current_user.accesses.build(access_params)
    #   @last_access.save
    #   redirect_to root_path
    # end
    # @user_id = params[:user_id]
    # @to_user = current_user.accesses.find_by(to_user_id: params[:to_user_id])
    # if @to_user
    #   # binding.pry
    #   redirect_to :action => 'update'
    # else
      @user_access = current_user.accesses.build(to_user_id: params[:to_user_id], last_access: params[:last_access])
      @user_access.save
      render json: @user_access
    # end
  end

  # private

  #   def access_params
  #     params.require(:access).permit(:user_id, :to_user_id, :last_access)
  #   end
end