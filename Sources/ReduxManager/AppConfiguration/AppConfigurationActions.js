import React from "react";
import RNSplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configStore, getStore } from "ReduxManager";
import { Navigator, AppContainer } from "Navigation";
import { NetInfo, Loading, Alert, CodePushUpdate, Toast } from "Components";
import { ToastType } from "Types";
import { StatusBarStyle, StatusBar as RN } from "react-native";
import { Strings } from "Localization";
import { DateTime } from "Utils";

const { store, persistor } = configStore();

export class App extends React.Component {
  private loadingRef = React.createRef<Loading>();
  private alertRef = React.createRef<Alert>();
  private toastRef = React.createRef<Toast>();

  componentWillMount() {
    if (__DEV__) {
      RNSplashScreen.hide();
    }
  }

  showLoading = (msg?: string) => {
    if (this.loadingRef.current) this.loadingRef.current.show(msg);
  };

  hideLoading = (onClose?: () => void) => {
    if (this.loadingRef.current) this.loadingRef.current.hide(onClose);
  };

  alertShow = (msg: string, onClose?: () => void) => {
    if (this.alertRef.current) this.alertRef.current.show(msg, onClose);
  };

  alertConfirm = (msg: string, onOk?: () => void, onCancel?: () => void) => {
    if (this.alertRef.current) this.alertRef.current.confirm(msg, onOk, onCancel);
  };

  showToast = (
    title: string,
    message: string,
    type: ToastType = "Info",
    duration: number = 4000,
    onShow?: () => void,
    onClose?: () => void,
    activeStatusBarType: StatusBarStyle = "light-content",
    deactiveStatusBarType: StatusBarStyle = "default"
  ) => {
    if (this.toastRef.current) {
      // @ts-ignore
      const backupProps = RN._currentValues;
      let _deactiveStatusBarType = deactiveStatusBarType;
      if (backupProps && backupProps.barStyle) {
        const { value } = backupProps.barStyle;
        if (value) {
          _deactiveStatusBarType = value;
        }
      }
      this.toastRef.current.show(
        title,
        message,
        type,
        duration,
        onShow,
        onClose,
        activeStatusBarType,
        _deactiveStatusBarType
      );
    }
  };

  hideToast = (onClose?: () => void) => {
    if (this.toastRef.current) {
      this.toastRef.current.hide(onClose);
    }
  };

  private getScreenProps() {
    return {
      showLoading: this.showLoading,
      hideLoading: this.hideLoading,
      alertShow: this.alertShow,
      alertConfirm: this.alertConfirm,
      showToast: this.showToast,
      hideToast: this.hideToast
    };
  }

  private setRoot = (r: any) => {
    Navigator.setRoot(r);
  };

  private onBeforeLift = () => {
    const { appConfiguration } = getStore().getState();
    const { language } = appConfiguration || { language: "vi" };
    if (language && language !== Strings.getLanguage()) {
      Strings.setLanguage(language);
      DateTime.setLocal(language);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={this.onBeforeLift}>
          <AppContainer ref={this.setRoot} screenProps={this.getScreenProps()} />
          <Loading ref={this.loadingRef} />
          <Alert ref={this.alertRef} />
          <Toast ref={this.toastRef} />
          <NetInfo />
          <CodePushUpdate />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
