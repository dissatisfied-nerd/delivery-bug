package dtos

import (
	"delivery-bug/internal/models"
)

type OrderDTOInput struct {
	Price    float64            `json:"price" validate:"required"`
	ClientID string             `json:"client_id" validate:"required"`
	Products []*OrderProductDTO `json:"products" validate:"required"`
}

type OrderDTOOutput struct {
	Price        float64            `json:"price"`
	ClientID     string             `json:"client_id"`
	CreationTime string             `json:"creation_time"`
	DeliveryTime string             `json:"delivery_time"`
	Products     []*OrderProductDTO `json:"products"`
}

type OrderProductDTO struct {
	Amount    int    `json:"amount" validate:"required"`
	ProductID string `json:"product_id" validate:"required"`
}

func ToOrderDTOOutput(order models.Orders, orderProducts []models.OrderProducts) *OrderDTOOutput {
	orderDTOOutput := new(OrderDTOOutput)

	orderDTOOutput.Price = order.Price

	orderDTOOutput.ClientID = order.ClientId

	if order.DeliveryTime != nil {
		orderDTOOutput.DeliveryTime = order.DeliveryTime.String()
	}

	if order.CreationTime != nil {
		orderDTOOutput.CreationTime = order.CreationTime.String()
	}

	for _, orderProduct := range orderProducts {
		orderDTOOutput.Products = append(orderDTOOutput.Products, &OrderProductDTO{
			Amount:    orderProduct.Amount,
			ProductID: orderProduct.ProductId,
		})
	}

	return orderDTOOutput
}
