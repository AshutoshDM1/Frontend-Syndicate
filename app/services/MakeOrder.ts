import type { APIResponse } from "~/types/api.types";
import api, { handleError } from "./api";

interface MakeOrderProps {
    tableId: string;
    customerName: string;
    customerPhone: string;
    totalAmount: number;
    status: string;
    paymentMethod: string;
    orderItems: any[];
}

export const MakeOrder = async (MakeOrderData : MakeOrderProps) => {
  try {
    const response = await api.post(`/orders`, MakeOrderData);
    const data = response.data as APIResponse<any>;
    return data;
  } catch (error) {
    handleError(error);
  }
};
