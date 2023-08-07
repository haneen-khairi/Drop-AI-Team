import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Placeholder } from 'rsuite';

interface DataPoints {
  [key: string]: number | null;
}

interface MiniChartProps {
  chartData: DataPoints;
  prices: any
}

const ApexChart: React.FC<MiniChartProps> = ({ chartData , prices }) => {
  const [pricesArray, setPricesArray] = useState([])
  const [chartValues, setChartValues] = useState([])
  const [data, setData] = useState<(number | null)[]>([]);
  const [dataState, setDataState] = useState<'L' | 'N' | 'Y'>('L'); // loading - No - Yes
  const [chartLabels, setChartLabels] = useState<string>();
  const [chartDateRange, setChartDateRange] = useState<'all' | 'week' | 'month' | 'year'>('all');
  useEffect(() => {
    // console.log('chartData ==>', prices)
    chartValuesConverted()
    setPricesArray(prices)

  }, [])
  
  useEffect(() => {
    setDataState("L")
    // filterData(chartDateRange)
  }, [chartDateRange])
  function chartValuesConverted(){

    // Step 3: Filter the array to include data from the last 7 days
    const priceArrayOfObject = prices.map((priceObject:any) => {
      const [date, priceStr] = Object.entries(priceObject)[0];
      const price = parseFloat(priceStr as string);
      return { date, price};
    });
    
    const pricesArray = priceArrayOfObject.map((price:any) => price.price )
    const dateArray = priceArrayOfObject.map((price:any) => price.date )

    // console.log('pricesArray ++>' , pricesArray)
    // // const dates = prices.map((price:any) => price.date)
    // console.log('date ++>',dateArray)
    // console.log('price ==>',prices)
    // console.log('date ==>',dates)
    setChartValues(pricesArray)
    setChartLabels(dateArray)
    // console.log(data)
  }
  const getWeekData = () => {
    const currentDate = new Date();
    const labels: string[] = [];
    const values: (number | null)[] = [];
    let noDataFlag = true;

    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      const formattedDate = formatDate(date);
      if (chartData[formattedDate]) {
        values.push(chartData[formattedDate])
        noDataFlag = false;
      } else {
        values.push(null)
      }
      labels.push(formattedDate);
    }
    console.log('ss==>?',labels, values, noDataFlag)
    return { labels, values, noDataFlag };
  };

  const getMonthData = () => {
    const currentDate = new Date();
    const labels: string[] = [];
    const values: (number | null)[] = [];
    let noDataFlag = true;

    let pairs = []
    for (let i = 29; i >= 0; i -= 1) {

      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      const formattedDate = formatDate(date);

      if (chartData[formattedDate]) {
        pairs.push(chartData[formattedDate])
        noDataFlag = false;
      } else {
        pairs.push(null)
      }

      if (pairs.length == 2) {
        const [first, sec] = pairs;
        // conditional average cause one or both the values could be null
        const avg = first && sec ? (first + sec) / 2 : sec ? sec : first ? first : null;
        const roundedAverage = avg ? Number(avg.toFixed(2)) : null;
        values.push(roundedAverage)
        labels.push(formattedDate);
        pairs = []
      }
    }

    return { labels, values, noDataFlag };
  };

  function getDatesInMonth(year: number, month: number) {
    const datesInMonth = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const newDate = new Date(year, month, day)
      if (newDate > new Date()) {
        break;
      }
      datesInMonth.push(formatDate(newDate));
    }

    return datesInMonth;
  }

  function calculateAverage(data: number[]) {
    // Calculate the sum of the filtered values
    if (data.length == 0) {
      return null
    }
    const sum = data.reduce((accumulator, value) => accumulator + value, 0);

    // Calculate the average by dividing the sum by the number of filtered values
    const average = sum / data.length;

    const roundedAverage = average.toFixed(2);

    return Number(roundedAverage);
  }

  function getMonthValues(data: string[]): { values: number[], noDataFlag: boolean } {
    // Filter out null values from the data array
    const values: number[] = []
    let noDataFlag = true
    for (const i of data) {
      const val = chartData[i];
      if (val != null) {
        values.push(val);
        noDataFlag = false;
      };
    }

    return { values, noDataFlag };
  }

  const getYearData = () => {
    const currentDate = new Date();
    const labels: string[] = [];
    const values: (number | null)[] = [];
    let yearNoDataFlag = true;

    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i);
      const formattedDate = formatDate(date);

      const year = date.getFullYear();
      const month = date.getMonth();
      const datesInMonth = getDatesInMonth(year, month);
      const { values: monthValues, noDataFlag: monthNoDataFlag } = getMonthValues(datesInMonth);
      if (monthNoDataFlag == false) {
        yearNoDataFlag = false
      }
      const monthAvg = calculateAverage(monthValues);

      values.push(monthAvg)
      labels.push(formattedDate);
    }

    return { labels, values, yearNoDataFlag };
  };

  // Helper function to format the date as "MM/dd/yyyy"
  const formatDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatShortDate = (date: Date): string => {
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    const monthName = date.toLocaleString('default', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${monthName}`;
  };

  function onSelectDate(date:string){
        // Step 1: Get the current date
        const currentDate = new Date();

        // Step 2: Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
    
        const lastMonth = new Date(currentDate);
        lastMonth.setMonth(currentDate.getMonth() - 1);
    
        const lastYear = new Date(currentDate);
        lastYear.setFullYear(currentDate.getFullYear() - 1);
    
        // Step 3: Filter the array to include data from the last 7 days
        const priceArrayOfObject = prices.map((priceObject:any) => {
          const [date, priceStr] = Object.entries(priceObject)[0];
          const price = parseFloat(priceStr as string);
          return { date, price};
        });
        const filteredDataLastWeek = priceArrayOfObject.filter((price:any) => {
          const itemDate = new Date(price.date);
          return itemDate >= sevenDaysAgo && itemDate <= currentDate;
        });
        const filteredDataLastMonth = priceArrayOfObject.filter((price:any) => {
          const itemDate = new Date(price.date);
          return itemDate >= lastMonth && itemDate <= currentDate;
        });
        const filteredDataLastYear = priceArrayOfObject.filter((price:any) => {
          const itemDate = new Date(price.date);
          return itemDate >= lastYear && itemDate <= currentDate;
        });
        if(date === 'week'){
          const pricesArray = filteredDataLastWeek.map((price:any) => price.price )
          const dateArray = filteredDataLastWeek.map((price:any) => price.date )
          console.log('week ==>',pricesArray)
          setChartDateRange('week')

          setChartValues(pricesArray)
          setChartLabels(dateArray)
        } else if(date === 'month'){
          const pricesArray = filteredDataLastMonth.map((price:any) => price.price )
          const dateArray = filteredDataLastMonth.map((price:any) => price.date )
          console.log('month ==>',pricesArray)
          setChartValues(pricesArray)
          setChartLabels(dateArray)
          setChartDateRange('month')

        } else if(date === 'year'){
          const pricesArray = filteredDataLastYear.map((price:any) => price.price )
          const dateArray = filteredDataLastYear.map((price:any) => price.date )
          console.log('year ==>',pricesArray)
          setChartDateRange('year')

          setChartValues(pricesArray)
          setChartLabels(dateArray)
        }else{
          const pricesArray = priceArrayOfObject.map((price:any) => price.price )
          const dateArray = priceArrayOfObject.map((price:any) => price.date )
          setChartValues(pricesArray)
          setChartLabels(dateArray)
          setChartDateRange('all')
        }
        // console.log('filtered by last week ago ==>' , filteredDataLastWeek)
        // console.log('filtered by last month ago ==>' , filteredDataLastMonth)
        // console.log('filtered by last year ago ==>' , filteredDataLastYear)
        console.log('date selected', date)

        // console.log('pricesArray ++>' , pricesArray)
        // // const dates = prices.map((price:any) => price.date)
        // console.log('date ++>',dateArray)
        // console.log('price ==>',prices)
        // console.log('date ==>',dates)

  }
  const loadingPlaceHolder = () => {
    return <>
      <Placeholder.Graph active height={350} width={450} />
    </>
  }

  const noDataPlaceHolder = () => {
    return <div className='chart-placeholder'>
      No Valid Data in Range
    </div>
  }

  // const filterData = (filterType: 'week' | 'month' | 'year') => {

  //   if (filterType == 'week') {
  //     const { labels, values, noDataFlag } = getWeekData()
  //     setData(values);
  //     setChartLabels(labels);
  //     noDataFlag ? setDataState('N') : setDataState('Y');
  //   }
  //   if (filterType == 'month') {
  //     const { labels, values, noDataFlag } = getMonthData()
  //     setData(values);
  //     setChartLabels(labels)
  //     noDataFlag ? setDataState('N') : setDataState('Y');
  //   }
  //   if (filterType == 'year') {
  //     const { labels, values, yearNoDataFlag } = getYearData()
  //     setData(values);
  //     setChartLabels(labels)
  //     yearNoDataFlag ? setDataState('N') : setDataState('Y');
  //   }
  // };

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6, // Set the border radius for the bars
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val}`, // Add a dollar sign to the tooltip value
      },
    },
    // grid: {
    //   // padding: {
    //   //   top: 14,
    //   //   right: 0,
    //   //   bottom: 0,
    //   //   left: 0
    //   // },
    // },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    markers: {
      size: 5,
      colors: ['#8c5cb3'],
    },
    xaxis: {
      type: 'category',
      categories: chartLabels,

    },
    yaxis: {
      // title: {
      //   text: '$'
      // },
      min: 0,
    },
    title: {
      align: 'left',
      style: {
        fontSize: '16px',
        color: '#8c5cb3',
      },
    },
    colors: ['#8c5cb3'],
  };

  return (
    <div className='chart-section'>
      <p className='chart-title'>Price History</p>
      <div className='chart-ctrls'>
        <button className={`chart-btn ${chartDateRange == 'all' && 'active'}`} onClick={() => onSelectDate('all')}>All</button>
        <button className={`chart-btn ${chartDateRange == 'week' && 'active'}`} onClick={() => onSelectDate('week')}>Last 7 Days</button>
        <button className={`chart-btn ${chartDateRange == 'month' && 'active'}`} onClick={() => onSelectDate('month')}>Last Month</button>
        <button className={`chart-btn ${chartDateRange == 'year' && 'active'}`} onClick={() => onSelectDate('year')}>Last Year</button>
      </div>
      {chartValues.length > 0 ?<div id="chart">
         {/* <ReactApexChart options={options} series={[{
                name: "Desktops",
                data: chartValues
        }]} type="line" height={350} width={450} />  */}
        {/* {dataState == "L" ? loadingPlaceHolder() : dataState == "N" ? noDataPlaceHolder() :
        } */}
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            
          {prices.map((price: any) => (
            <tr key={price?.date}>
              <td scope="row">{price?.date}</td>
              <td>{price?.price}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>: 'No data' }
    </div>
  );
};

export default ApexChart;
