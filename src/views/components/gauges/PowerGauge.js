import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
export PowerGauge =() => {
    return (
      <View style={styles.powerGaugeContainer}>
          <Text style={styles.powerLabel}>power</Text>
          <View>
              <AnimatedGaugeProgress
                  style={styles.powerGauge}
                  size={255}
                  width={20}
                  fill={ this.evaluatePower(this.state.powerDisplay,this.state.currentMax)}
                  rotation={90}
                  cropDegree={90}
                  tintColor="purple"
                  backgroundColor="gray"
                  stroke={[2, 2]} //For a equaly dashed line
                  strokeCap="circle" >
              {(fill) => (
                <View style={styles.gaugeRange}>
                  <Text style={styles.minText}>0</Text>
                  <Text style={styles.maxText}>1000</Text>
                </View>
              )}
              </AnimatedGaugeProgress>
          </View>
          <View style={styles.powerDisplay}> 
                          <Text style={styles.powerDisplayDigit} >{ (parseFloat(this.state.powerDisplay)).toFixed(2)}</Text> 
                          <Text style={styles.powerDisplayUnit}> {this.state.powerUnit} </Text>
          </View>             
      </View>
            ) ; 
}