"use server";

import axios from "axios";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// LOGIN
export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await axios.post(`${STRAPI_URL}/api/auth/local`, {
      identifier: email,
      password,
    });

    const { jwt, user } = res.data;

    return {
      success: true,
      token: jwt,
      user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.error?.message || "Erro ao fazer login.",
    };
  }
}

// CADASTRO
export async function signUpAction({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const res = await axios.post(`${STRAPI_URL}/api/auth/local/register`, {
      username,
      email,
      password,
    });

    const { jwt, user } = res.data;

    return {
      success: true,
      token: jwt,
      user,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.error?.message || "Erro ao realizar cadastro.",
    };
  }
}
