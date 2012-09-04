class MileagesController < ApplicationController
  # GET /mileages
  # GET /mileages.json
  def index
    @mileages = Mileage.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @mileages }
    end
  end

  # GET /mileages/1
  # GET /mileages/1.json
  def show
    @mileage = Mileage.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @mileage }
    end
  end

  # GET /mileages/new
  # GET /mileages/new.json
  def new
    @mileage = Mileage.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @mileage }
    end
  end

  # GET /mileages/1/edit
  def edit
    @mileage = Mileage.find(params[:id])
  end

  # POST /mileages
  # POST /mileages.json
  def create
    @mileage = Mileage.new(params[:mileage])

    respond_to do |format|
      if @mileage.save
        format.html { redirect_to @mileage, notice: 'Mileage was successfully created.' }
        format.json { render json: @mileage, status: :created, location: @mileage }
      else
        format.html { render action: "new" }
        format.json { render json: @mileage.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /mileages/1
  # PUT /mileages/1.json
  def update
    @mileage = Mileage.find(params[:id])

    respond_to do |format|
      if @mileage.update_attributes(params[:mileage])
        format.html { redirect_to @mileage, notice: 'Mileage was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @mileage.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mileages/1
  # DELETE /mileages/1.json
  def destroy
    @mileage = Mileage.find(params[:id])
    @mileage.destroy

    respond_to do |format|
      format.html { redirect_to mileages_url }
      format.json { head :no_content }
    end
  end
end
