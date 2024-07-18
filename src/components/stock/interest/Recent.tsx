import StockListItem from '@/components/shared/StockListItem';
import { Stock } from '@/types/stock';

export default function Recent({
  recentStocks,
}: {
  recentStocks: Array<Stock>;
}) {
  if (recentStocks.length === 0) return null;

  return (
    <div className="max-w-[714px] min-w-[714px] flex flex-col gap-4 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="b3 font-medium text-primary-900">
          최근 검색한 종목
        </h3>
        <button className="b5 font-medium text-grayscale-600">
          전체삭제
        </button>
      </div>
      <ul className="flex gap-[20px] overflow-x-auto scrollbar-hide">
        {recentStocks.map((stock) => (
          <li
            key={stock.stock_id}
            className="border border-primary-100 rounded-lg pr-4 flex items-center justify-center"
          >
            <StockListItem stock={stock} type="default" />
          </li>
        ))}
      </ul>
    </div>
  );
}
