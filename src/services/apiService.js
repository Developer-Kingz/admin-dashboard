import { apiCall } from "../utils"

const apiUrl = import.meta.env.VITE_MAINSTACK_URL;

export async function getUserData() {
    const response = await apiCall({
        url: `${apiUrl}/user`,
        method: "GET"
    });
    return response.data
}

export async function getWalletData() {
    const response = await apiCall({
        url: `${apiUrl}/wallet`,
        method: "GET"
    });
    return response.data
}

export async function getTransactions() {
    const response = await apiCall({
        url: `${apiUrl}/transactions`,
        method: "GET"
    });
    return response.data
}