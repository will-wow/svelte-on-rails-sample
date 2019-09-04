class Api::ContactsController < Api::ApplicationController
  before_action :set_contact, only: %i[show edit update destroy]

  def index
    contacts = Contact.all
    render :json => contacts
  end

  def show
    render :json => @contact
  end

  def create
    contact = Contact.new(contact_params)

    if contact.save
      render :json => contact
    end
  end

  def update
    if @contact.update(contact_params)
      render :json => @contact
    end
  end

  def destroy
    @contact.destroy
    render :json => @contact
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_contact
    @contact = Contact.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def contact_params
    params.require(:contact).permit(:name, :email, :twitter, :phone)
  end
end
