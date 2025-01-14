'use client';
import React from 'react';
import StockIcon from './StockIcon';
import { Stock } from '@/types/stock';
import Link from 'next/link';
import { formattingPrice, getStockStyle } from '@/utils/stock';
import { useRouter } from 'next/navigation';

export type StockListItemProps = {
  stock: Stock;
  type?:
    | 'related'
    | 'find'
    | 'default'
    | 'report'
    | 'description'
    | 'popular'
    | 'interest';
};

function StockListItem({
  stock,
  type = 'default',
}: StockListItemProps) {
  const {
    stock_id,
    stock_name,
    stock_code,
    logo_path,
    fluctuations_ratio,
    price,
    compare_to_previous_close_price: cp,
  } = stock;

  const style = getStockStyle(cp, fluctuations_ratio);

  const router = useRouter();
  const handleClick = async (stock_id: string) => {
    router.push(`/stock/${stock_id}`);
  };

  return (
    <>
      {type === 'default' && (
        <button
          className="py-2 flex w-full text-grayscale-900 gap-4 items-center cursor-pointer group"
          onClick={() => handleClick(stock_id)}
        >
          <StockIcon
            size="medium"
            path={logo_path}
            stockName={stock_name}
          />
          <div className="flex-1 flex justify-between h-full items-center">
            <div className="flex flex-col text-left">
              <span className={` b2 font-bold group-hover:underline`}>
                {stock_name}
              </span>
              <span className="b5 font-normal ">{stock_code}</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-right b3 font-medium`}>
                ${formattingPrice(price)}
              </span>
              <div
                className={`flex gap-2 b4 font-normal
              ${style.color}
              `}
              >
                <span>{style.comparePrice}</span>
                <span>{style.ratio}</span>
              </div>
            </div>
          </div>
        </button>
      )}
      {type === 'find' && (
        <button
          className="py-2 flex w-full text-grayscale-900 gap-4 items-center cursor-pointer group"
          onClick={() => handleClick(stock_id)}
        >
          <StockIcon
            size={'small'}
            path={logo_path}
            stockName={stock_name}
          />
          <div className="flex-1 flex justify-between">
            <div className="flex flex-col text-left">
              <span className={`b4 font-bold group-hover:underline`}>
                {stock_name}
              </span>
              <span className="b5 font-normal ">{stock_code}</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className={`text-right b5 font-medium`}>
                ${formattingPrice(price)}
              </span>
              <div
                className={`flex gap-2 
              ${style.color}
              caption`}
              >
                <span>{style.comparePrice}</span>
                <span>{style.ratio}</span>
              </div>
            </div>
          </div>
        </button>
      )}
      {type === 'related' && (
        <div className="w-full">
          <div className="flex items-center gap-2">
            <StockIcon
              path={logo_path}
              size="small"
              stockName={stock_name}
            />
            <div className="flex gap-2 items-center">
              <span className="b1 font-bold">{stock_name}</span>
              <span className="b3 font-normal">{stock_code}</span>
            </div>
          </div>
          <div
            className={`flex gap-2 
              ${style.color}
              caption`}
          >
            <span className={`b4 font-medium text-grayscale-900`}>
              ${formattingPrice(price)}
            </span>
            <span className={`b4 font-normal`}>
              {style.comparePrice}
            </span>
            <span className={`b4 font-normal`}>{style.ratio}</span>
          </div>
        </div>
      )}
      {type === 'report' && (
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <StockIcon
              path={logo_path}
              size="small"
              stockName={stock_name}
            />
            <span className="b3 font-medium">{stock_name}</span>
            <span className="b2">∙</span>
            <span className="b3">{stock_code}</span>
          </div>
          <span className="b4 font-medium">
            ${formattingPrice(price)}
          </span>
          <div
            className={`flex h-full items-center gap-2 ${style.color}`}
          >
            <span className="b4">{style.comparePrice}</span>
            <span className={`b4 `}>{style.ratio}</span>
          </div>
        </div>
      )}
      {type === 'description' && (
        <div>
          <div className="text-primary-900 flex items-center gap-1">
            <span className="b1 font-bold">
              ${formattingPrice(price)}
            </span>
            <span className="b1 font-bold">∙</span>
            <span className="b2">{stock_code}</span>
          </div>
          <div
            className={`b2 font-medium flex items-center gap-2 ${style.color}`}
          >
            <span>{style.comparePrice}</span>
            <span>{style.ratio}</span>
          </div>
        </div>
      )}
      {type === 'popular' && (
        <Link
          href={`/stock/${stock_id}`}
          className="cursor-pointer group w-[302px]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <StockIcon
                size="small"
                path={logo_path}
                stockName={stock_name}
              />
              <span
                className={`b4 font-medium text-grayscale-600 group-hover:underline`}
              >
                {stock_name}
              </span>
            </div>

            <div
              className={`flex gap-2 b5 font-normal
              ${style.color}
              `}
            >
              <span>{style.comparePrice}</span>
              <span>{style.ratio}</span>
            </div>
          </div>
        </Link>
      )}
      {type === 'interest' && (
        <div className="w-full">
          <div className="flex items-center gap-2">
            <StockIcon
              path={logo_path}
              size="small"
              stockName={stock_name}
            />
            <div className="flex gap-2 items-center">
              <span className="b1 font-bold">{stock_name}</span>
              <span className="b3 font-normal">{stock_code}</span>
            </div>
          </div>
          <div
            className={`flex gap-2 
              ${style.color}
              caption`}
          >
            <span className={`b4 font-medium text-grayscale-900`}>
              ${formattingPrice(price)}
            </span>
            <span className={`b4 font-normal`}>
              {style.comparePrice}
            </span>
            <span className={`b4 font-normal`}>{style.ratio}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(StockListItem);
