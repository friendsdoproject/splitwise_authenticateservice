export class ErrorMessage {
  public static readonly USER_NOT_EXISTS =
    "User doesn't present in the Database";
  public static readonly TOKEN_NOT_MATCHED = "Token not matched";
  public static readonly BEARER_TOKEN_NOT_PROVIDED =
    "Bearer token is required for resource access";
  public static readonly EMPTY_DATA = "No records available";
  public static readonly HEADER_DOESNT_CONTAIN_REFRESH_TOKEN =
    "Request Header doesn't contain refresh Token";
}
