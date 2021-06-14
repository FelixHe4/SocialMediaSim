import CardButton from "@/components/CardButton";

const CommunityCardButton = ({ icon, children, ...props }) => (
  <CardButton {...props} className="grid justify-items-center gap-2 max-w-xs">
    <div className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-gray-400 font-bold text-sm">{children}</span>
  </CardButton>
);

export default CommunityCardButton;
