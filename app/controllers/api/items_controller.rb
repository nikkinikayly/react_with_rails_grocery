class Api::ItemsController < ApplicationController
    before_action :set_list
    before_action :set_item, only: [:show, :update, :destroy]
    
    def index
        render json: @list.items.all
    end
    
    def show
        render json: @item
    end
    
    def create
        item = List.items.new(item_params)
    
        if product.save
        render json: item
        else
        render json: item.errors, status: 422
        end
    end
    
    def update
        if @item.update(item_params)
        render json: @item
        else
        render json: @item.errors, status: 422
        end
    end
    
    def destroy
        @item.destroy
    end
    
    private
        def set_list
            @list = List.find(params[:list_id])
        end
        def set_product
        @item = @list.items.find(params[:id])
        end
    
        def item_params
        params.require(:item).permit(:name, :price, :complete)
        end

end
