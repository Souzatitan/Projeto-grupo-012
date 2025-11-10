// app/api/login/route.js
export async function POST(request) {
  try {
    const { username, password } = await request.json();


    const isValid = validCredentials.some(
      cred => cred.user === username && cred.pass === password
    );

    if (isValid) {
      return Response.json({ 
        success: true,
        message: "Login bem-sucedido",
        user: {
          name: username,
          role: "admin"
        }
      }, {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return Response.json({ 
        success: false,
        message: "Usuário ou senha incorretos"
      }, {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
  } catch (error) {
    console.error('Erro no login:', error);
    return Response.json({ 
      success: false,
      message: "Erro interno do servidor"
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}