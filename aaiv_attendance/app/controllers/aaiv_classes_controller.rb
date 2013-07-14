class AaivClassesController < ApplicationController
  before_action :set_aaiv_class, only: [:show, :edit, :update, :destroy]

  # GET /aaiv_classes
  # GET /aaiv_classes.json
  def index
    @aaiv_classes = AaivClass.all
  end

  # GET /aaiv_classes/1
  # GET /aaiv_classes/1.json
  def show
  end

  # GET /aaiv_classes/new
  def new
    @aaiv_class = AaivClass.new
  end

  # GET /aaiv_classes/1/edit
  def edit
  end

  # POST /aaiv_classes
  # POST /aaiv_classes.json
  def create
    @aaiv_class = AaivClass.new(aaiv_class_params)

    respond_to do |format|
      if @aaiv_class.save
        format.html { redirect_to @aaiv_class, notice: 'Aaiv class was successfully created.' }
        format.json { render action: 'show', status: :created, location: @aaiv_class }
      else
        format.html { render action: 'new' }
        format.json { render json: @aaiv_class.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /aaiv_classes/1
  # PATCH/PUT /aaiv_classes/1.json
  def update
    respond_to do |format|
      if @aaiv_class.update(aaiv_class_params)
        format.html { redirect_to @aaiv_class, notice: 'Aaiv class was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @aaiv_class.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /aaiv_classes/1
  # DELETE /aaiv_classes/1.json
  def destroy
    @aaiv_class.destroy
    respond_to do |format|
      format.html { redirect_to aaiv_classes_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_aaiv_class
      @aaiv_class = AaivClass.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def aaiv_class_params
      params.require(:aaiv_class).permit(:graduationYear, :person)
    end
end
