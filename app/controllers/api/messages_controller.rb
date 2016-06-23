class Api::MessagesController < Api::ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end

  def create
    @message = Message.new(message: params[:message])
    @message.save
    # redirect_to :action => "index"
    render json: { message: @message }
  end

  # private

  #   def message_params
  #     params.require(:message).permit(:message)
  #   end
end