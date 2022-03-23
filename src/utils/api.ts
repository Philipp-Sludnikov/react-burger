import { getCookie, setCookie } from './cookie';

export const API_URL: string = 'https://norma.nomoreparties.space';

export const checkResponse = (res: Response): Promise<string> => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
}

export const getUserRequest = async (): Promise<unknown> => {

  const accessToken = getCookie('accessToken');

  if(accessToken) {
    const request = await fetch(`${API_URL}/api/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': accessToken
      },
    });

    const data = await request.json();
    if (request.ok) {
        return data;
    }

    if (data.message === 'jwt expired') {
        await refreshUserToken();
        return await getUserRequest();
    }
  }
}

export const updateUserRequest = async (user: string): Promise<unknown> => {
      const token = getCookie('accessToken');

      const request = await fetch(`${API_URL}/api/auth/user`, {
          method: 'PATCH',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': token ? token : ''
          },
          body: JSON.stringify(user)
      });

      const data = await request.json();
      if (request.ok) {
        return data;
      }

      if (data.message === 'jwt expired') {
        await refreshUserToken();
        return await updateUserRequest(user);
      }

  };

export const refreshUserToken = async (): Promise<void>  => {
  
  const refreshToken = getCookie('refreshToken');

  if (refreshToken) {
      const request = await fetch(`${API_URL}/api/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({token: refreshToken})
      })

      if (request.ok) {
          const data = await request.json()

          if (data.success) {
              setCookie('accessToken', data.accessToken)
              setCookie('refreshToken', data.refreshToken)
          }
      }
  }
}