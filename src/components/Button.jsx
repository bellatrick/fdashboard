import LoadingSpinner from "./LoadingSpinner"

const Button = (props) => {
    return (
        <div>
             <div>
                  <button
                    type="submit"
                    disabled={props.spin}
                    data-testid={props.data_testid}
                    className="w-full flex justify-center py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                  >                  
                  {props.spin ? <LoadingSpinner data-testid='spinner' height={'6'} width={'5'}/>: props.text}
                  </button>
                </div>
        </div>
    )
}

export default Button
