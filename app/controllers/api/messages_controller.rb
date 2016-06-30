class Api::MessagesController < Api::ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end

  def create
    @message = current_user.messages.build(message: params[:message])
    @message.save
    render json: { message: @message }
  end
end