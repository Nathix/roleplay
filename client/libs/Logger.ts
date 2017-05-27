class Logger  {
  log(message: string)  {
    API.triggerServerEvent("log", message);
  }
}
