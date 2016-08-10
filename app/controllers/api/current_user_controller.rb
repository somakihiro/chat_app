class Api::CurrentUserController < ApplicationController

  def index
    render json: current_user.as_json(include: [:messages, :accesses])
  end

   def update
    @to_access_user = current_user.accesses.find_by(to_user_id: params[:to_user_id])
    @to_access_user.update(last_access: params[:last_access])
    render json: @to_access_user
  end

end