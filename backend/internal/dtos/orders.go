package dtos

import (
	"delivery-bug/internal/models"
	"time"
)

type OrderDTOInput struct {
	Price    float64            `json:"price" validate:"required"`
	ClientID string             `json:"client_id" validate:"required"`
	Products []*OrderProductDTO `json:"products" validate:"required"`
}

type OrderUserDTOOutput struct {
	Price        float64            `json:"price"`
	ClientID     string             `json:"client_id"`
	CreationTime string             `json:"creation_time"`
	DeliveryTime string             `json:"delivery_time"`
	Products     []*OrderProductDTO `json:"products"`
}

type OrderDTO struct {
	ID           string            `json:"id"`
	Price        float64           `json:"price"`
	Status       string            `json:"status"`
	CreationTime *time.Time        `json:"creation_time"`
	DeliveryTime *time.Time        `json:"delivery_time"`
	ClientID     string            `json:"client_id"`
	Products     []OrderProductDTO `json:"products"`
}

type OrderCourierDTOOutput struct {
	Price        float64            `json:"price"`
	CourierID    string             `json:"client_id"`
	CreationTime string             `json:"creation_time"`
	DeliveryTime string             `json:"delivery_time"`
	Products     []*OrderProductDTO `json:"products"`
}

type OrderProductDTO struct {
	Amount    int    `json:"amount" validate:"required"`
	ProductID string `json:"product_id" validate:"required"`
}

func ToOrderUserDTOOutput(order models.Order, orderProducts []models.OrderProducts) *OrderUserDTOOutput {
	orderDTOOutput := new(OrderUserDTOOutput)

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

func ToOrderCourierDTOOutput(order models.Order, orderProducts []models.OrderProducts) *OrderCourierDTOOutput {
	orderDTOOutput := new(OrderCourierDTOOutput)

	orderDTOOutput.Price = order.Price

	orderDTOOutput.CourierID = *order.CourierId

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
