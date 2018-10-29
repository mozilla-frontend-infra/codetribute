import { PureComponent } from 'react';
import { number, string } from 'prop-types';

export default class RustIcon extends PureComponent {
  static propTypes = {
    size: number,
    fill: string,
  };

  static defaultProps = {
    size: 24,
    fill: 'currentColor',
  };

  render() {
    const { className, size, fill } = this.props;

    return (
      <svg
        className={className}
        viewBox="0 0 143 143"
        height={size}
        fill={fill}>
        <path d="M70.672.00103c-2.8476 1.0534-3.605 4.6678-5.4375 6.9375-2.997.69749-4.2498-3.2581-6.3986-4.8257-3.7994-2.56-4.3059 3.4366-5.5213 5.8143-1.11 3.7223-4.5626-.0495-6.4282-1.2461-3.2531-3.469-5.5003 1.0134-5.2957 4.2586.47638 3.6894-2.8558 4.3194-5.3372 2.2788-2.8709-2.4146-7.1731-1.3479-5.9021 2.9441.35785 2.4574.60241 6.9559-3.1379 5.2574-2.5981-.64393-8.288-2.7426-7.1716 2.1144.0407 2.4285 2.8405 6.1116-.0843 7.3898-2.7788.26525-6.0702-1.1007-8.4106.67054-.68965 2.9543 1.879 5.5904 2.75 8.375-1.0767 2.8838-5.0658 1.7356-7.5612 2.6569-4.2466 1.7031.4774 5.5006 1.7712 7.831 2.4634 2.9932-2.5739 3.7526-4.6034 4.6342-4.6826.7601-2.229 5.1543.59233 6.7686 3.3351 1.6478 2.0233 4.7714-1.0595 5.6991-3.604 1.0391-5.1099 5.2259-.83666 6.5534 2.2421 1.0589 6.125 3.3845 2.6289 5.5365-2.0041 1.7782-6.8646 5.3348-2.2403 7.1316 2.0442 1.3073 6.686.99289 6.0748 4.1722-1.3113 2.4563-4.2468 4.4378-4.0788 7.3602 2.0879 2.1873 5.6996 1.5243 8.5 2.3438 1.7325 2.533-1.3915 5.1894-2.0235 7.7834-.91169 4.4941 4.8316 2.6559 7.494 2.8603 3.8782-.43111 1.7072 4.2049 1.3124 6.3857-1.9883 4.3538 3.0318 4.736 5.9776 3.3084 3.2166-1.8262 5.0857.94906 4.142 4.0294-1.1319 3.5826 1.4815 7.1743 4.9805 4.3506 2.1251-1.2742 6.2097-3.2043 6.0638.8921.38722 2.6465.61162 8.6919 4.6747 5.7952 2.2284-.97205 4.5616-5.0064 6.8622-2.7156 1.3065 2.4484 1.2744 6.0289 3.8287 7.4668 2.9912-.50064 4.4471-3.8785 6.6875-5.75 3.069-.042 3.5388 4.0387 5.3434 6.0039 3.2366 3.2534 4.9074-2.5303 6.5534-4.6376 1.8087-3.4636 4.4554.90075 6.0447 2.4566 2.4973 4.0479 5.639.11988 6.0526-3.1241.24758-3.6947 3.6328-3.7006 5.6624-1.2093 2.3446 2.9146 6.7665 2.7526 6.3548-1.7151.11429-2.4978.79344-6.9384 4.1309-4.534 2.4087 1.1531 7.56 4.2924 7.423-.6692.42857-2.3911-1.6214-6.5588 1.514-7.23 2.7807.27838 5.7442 2.2347 8.3896.97129 1.2287-2.7773-.75239-5.8696-1.0625-8.7812 1.6428-2.571 5.3045-.68745 7.9263-1.1008 4.532-.83769.63757-5.484-.1993-8.0223-1.8655-3.4266 3.2282-3.196 5.4025-3.6513 4.7794.18445 3.1785-4.6139.73983-6.7709-2.946-2.2714-1.0047-5.0682 2.1799-5.3712 3.756-.3063 5.9756-4.1342 2.0613-6.2608-2.0095-1.4792-5.31-4.5099-1.4624-5.9421 2.3036-1.3603 7.7666-3.8994 3.5738-6.5534-1.758-1.6843-6.3499-2.2971-5.1771-5.2882 1.7706-2.1495 5.102-3.4955 5.4551-6.414-1.6025-2.5535-5.2696-2.6144-7.8438-3.9688-1.2835-2.8049 2.3495-4.8171 3.4627-7.2364 1.8011-4.2263-4.2062-3.5364-6.7705-4.2586-3.885-.34958-.84813-4.4816-.0236-6.5434 2.7866-3.865-2.0727-5.2213-5.2191-4.3812-3.5162 1.1796-4.7968-1.9216-3.2849-4.7618 1.7925-3.304-.0554-7.3184-4.046-5.24-2.3342.81627-6.7124 1.9341-5.7659-2.0569.13953-2.6746 1.089-8.6537-3.4596-6.6255-2.3761.52427-5.4318 3.9952-7.27 1.3631-.79905-2.6673-.10983-6.1489-2.2794-8.103-3.029-.0822-5.1232 2.9197-7.6875 4.3125-3.035-.5182-2.683-4.6462-4.069-6.9177-2.565-3.7865-5.303 1.5361-7.323 3.2875-2.445 3.0482-4.197-1.7732-5.451-3.6076-.687-.9993-1.188-2.5361-2.689-2.4897zm-.125 12.562c7.2377.15055 3.4086 11.857-2.5059 7.7143-3.4429-2.1961-1.5417-7.9299 2.5059-7.7143zm-9.5312 6.9688c2.6202 2.5335 4.8134 5.5642 7.7584 7.7195 4.3835 1.1162 6.6642-3.7702 9.7193-6.046 4.8437-4.2342 12.575 2.5285 17.741 4.1599 8.1255 4.5869 14.973 11.404 19.594 19.51-1.7042 4.2687-4.0638 8.3231-5.2969 12.746.64993 4.4625 6.0191 4.7317 9.2794 6.7013 4.5366.41454 3.5671 9.2159 1.4984 10.178-2.6466-.29032-5.9578-.33568-4.8872 3.288 1.3034 6.7294-8.9675 10.299-12.188 4.587.74822-6.1624-6.6305-11.804-7.4878-14.891 6.7199-3.9059 12.317-12.235 8.4496-20.018-3.9283-8.6122-13.949-12.307-22.913-11.498h-50.33c7.5481-8.4621 17.902-14.373 29.062-16.438zm-41 31.25c8.7783.39583 1.804 13.308-3.3582 6.7121-2.0131-2.6274.0305-6.7621 3.3582-6.7121zm100.88.21875c7.2639.16121 3.387 11.881-2.5238 7.6709-3.3552-2.2049-1.5495-7.8707 2.5238-7.6709zm-92.719.6875h7.375v33.219h-14.875c-1.829-6.4253-2.3668-13.203-1.6875-19.844 3.4236-1.6898 7.1535-2.8413 10.342-4.9437 2.4765-2.6676-.24968-5.7711-1.1548-8.4313zm30.719.34375c6.3086.13768 12.663-.28462 18.941.22816 9.0465 1.6495 3.3623 11.975-3.8662 9.5531h-15.075v-9.7812zm0 23.875c5.376.20934 10.849-.47845 16.147.4672 7.5741 3.004 5.5648 12.664 8.4809 18.801 1.7563 5.2313 6.9569 7.0066 11.917 6.3254 5.702-.0614 11.419.12353 17.112-.0937-2.2518 3.3936-4.8379 7.0158-9.139 4.7335-3.5032-1.0519-9.1267-2.1217-9.4273 3.1648-.62372 2.8985-1.2474 5.797-1.8712 8.6955-13.568 6.2384-29.838 6.1464-43.344-.21875-.96954-3.7412-1.3-7.6874-2.7336-11.28-3.0016-3.2152-7.375-.3676-11.031-.042-2.4484 1.4874-8.6593-6.4165-3.7598-4.9595 13.55-.0678 27.123.13557 40.658-.10162.48861-5.0567.0716-10.323.21029-15.461-2.0138-1.1667-5.1506-.22929-7.6181-.53125-2.0398-.49738-6.516 1.4417-5.6007-2.0108v-7.4892zm-19.75 34.375c9.6204.91975.32692 13.98-3.8316 5.9405-1.2735-2.6884.89739-5.927 3.8316-5.9405zm62.625.21875c7.2772.0747 3.4998 11.883-2.4709 7.7029-3.319-2.1876-1.6244-7.863 2.4709-7.7029z" />
      </svg>
    );
  }
}
