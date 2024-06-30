export const getUserData = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
