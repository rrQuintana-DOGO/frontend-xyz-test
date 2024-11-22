import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { transformStringToDateFormat } from '@utils/transforms/transformDates';
import { Place } from '@logic/interfaces/TripInterface';
import { styled } from '@mui/material/styles';
import { CustomButton } from '@components/inputs/CustomButton';

export default function TripsCollapsibleDetailsStepper(
  { places, seeAll = () => { }
  }: {
    places: Place[],
    seeAll?: () => void
  }) {
  const CustomStepIcon = styled('div')<{ active: boolean }>(({ theme, active }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: active ? theme.palette.primary.main : 'transparent',
    border: active ? `2px solid ${theme.palette.primary.main}` : '2px solid #D3DAE6',
    color: active ? 'white' : 'black',
  }));

  const currentDate = Math.floor(Date.now() / 1000);
  return (
    <Box>
      {places.length > 0 ?
        <Stepper orientation="vertical">
          {places.map((place) => {
            const isActive = Number(place.estimate_departure_date) < currentDate;
            return (
              <Step
                key={place.icon}
                expanded
              >
                <StepLabel
                  slots={{ stepIcon: () => <CustomStepIcon active={isActive}>{place.icon}</CustomStepIcon> }}
                  sx={{
                    '& .MuiStepLabel-label': {
                      color: 'black',
                      fontWeight: 'bold',
                    }
                  }}
                >
                  {place.isMiddle ?
                    <div className="flex space-x-8">
                      <p className='font-bold'>Puntos intermedios</p>
                      <CustomButton
                        variant="text"
                        label="Ver todos"
                        size="small"
                        onClick={seeAll}
                        sx={{
                          paddingLeft: 0
                        }}
                      />
                    </div>
                    : place.name
                  }
                </StepLabel>
                <StepContent>
                  {!place.isMiddle &&
                    <div className="flex">
                      <div className="flex-1">
                        <div>
                          <p className='font-bold'>Entrada programada</p>
                          <p>{place.estimate_arrive_date ? transformStringToDateFormat(place.estimate_arrive_date) : 'N/A'}</p>
                        </div>
                        <div>
                          <p className="font-bold">Salida programada</p>
                          <p>{place.estimate_departure_date ? transformStringToDateFormat(place.estimate_departure_date) : 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div>
                          <p className='font-bold'>Entrada real</p>
                          <p>{place.real_arrive_date ? transformStringToDateFormat(place.real_arrive_date) : 'Pendiente'}</p>
                        </div>
                        <div>
                          <p className="font-bold">Salida real</p>
                          <p>{place.real_departure_date ? transformStringToDateFormat(place.real_departure_date) : 'Pendiente'}</p>
                        </div>
                      </div>
                    </div>
                  }
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        :
        <div>
          <p className="font-bold">No hay lugares asignados</p>
        </div>
      }
    </Box>
  )
}