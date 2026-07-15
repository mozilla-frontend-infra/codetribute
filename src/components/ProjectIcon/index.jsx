export default function ProjectIcon(props) {
  const { icon } = props;
  const iconSrc = (icon) ? `/icons/${icon}.svg` : `/icons/dino.svg`;

  return <img height="48" src={iconSrc} alt="" />;
}
