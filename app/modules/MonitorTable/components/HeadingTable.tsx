import { Card } from '~/components/ui/card';

const HeadingTable = () => {
  return (
    <>
      {/* Status Legend */}
      <Card className="mb-5 p-4 bg-card border-border">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm shadow-sm"></div>
            <span className="text-sm font-medium text-card-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-sm shadow-sm"></div>
            <span className="text-sm font-medium text-card-foreground">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-sm shadow-sm"></div>
            <span className="text-sm font-medium text-card-foreground">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-sm shadow-sm"></div>
            <span className="text-sm font-medium text-card-foreground">Taking Order</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted-foreground rounded-sm shadow-sm"></div>
            <span className="text-sm font-medium text-card-foreground">Needs Cleaning</span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default HeadingTable;
