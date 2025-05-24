// app/api/login/route.js
export async function POST(request) {
  const { username, password } = await request.json();

  // Configure suas credenciais válidas aqui
  const validCredentials = [
    { user: "admin", pass: "senha123" },
    { user: "caravelas", pass: "moveis2024" }
  ];

  const isValid = validCredentials.some(
    cred => cred.user === username && cred.pass === password
  );

  if (isValid) {
    return Response.json({ 
      success: true,
      message: "Login bem-sucedido"
    });
  } else {
    return Response.json({ 
      success: false,
      message: "Credenciais inválidas"
    }, { status: 401 });
  }
}