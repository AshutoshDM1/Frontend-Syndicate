import type { APIResponse } from "~/types/api.types";
import api, { handleError } from "./api";

interface SendMenuItemProps {
    tableId: string;
    customerName: string;
    customerPhone: string;
    totalAmount: number;
    status: string;
    paymentMethod: string;
    orderItems: any[];
}

export const SendMenuItem = async (SendData : SendMenuItemProps) => {
  try {
    const response = await api.post(`/orders`, SendData);
    const data = response.data as APIResponse<any>;
    return data;
  } catch (error) {
    handleError(error);
  }
};
