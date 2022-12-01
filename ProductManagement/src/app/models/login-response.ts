export interface LoginResponse {
    data: {
        user: {
          id: string,
          first_name: string,
          last_name: string,
          user_name: string,
          profile_image: string,
          email: string,
        },
        token: string
      },
      msg: string
}
