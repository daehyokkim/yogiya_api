export default class Utils {
  //net Msg header
  static netMessage(_error: boolean, _msg: any) {
    const obj: any = { error: _error, message: _msg, data: {} };
    return obj;
  }
}
