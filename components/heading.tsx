type HeadingProps = {
  title: string;
  description: string;
};

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="space-y-1">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
