export async function getServerSideProps() {
  const authURL = `${process.env.LLAMA_API_URL}auth/token`;
  const authBody = {
    username: `${process.env.LLAMA_USER_NAME}`,
    password: `${process.env.LLAMA_PASSWORD}`,
  };

  const param = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(authBody),
  };

  try {
    const response = await fetch(authURL, param);
    const authData = await response.json();
    return { props: { authData } };
  } catch (error) {
    console.error('Fetch failed', error);
    return { props: { error: 'API 호출 실패' } };
  }
}
