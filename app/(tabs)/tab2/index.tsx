import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useState } from 'react';
import GoingBackHeader from '@components/ui/GoingBackHeader';
import Autocomplete from '@components/ui/Autocomplete/Autocomplete';
import { EmployeeItemType } from '@components/ui/Autocomplete/Autocomplete.types';

import { RPH, RPW } from '@utils/dimensions'
import { appStyle } from '@styles/appStyle';

export default function Tab2Page() {

  const employeeList : EmployeeItemType[] = [{"employee": {"__v": 9, "_id": "694046fa9c31680cd45cf9b1", "contract_end": null, "createdAt": "2025-12-15T17:35:54.181Z", "email": "ju@ju.ju", "first_name": "Julien", "last_name": "Furic", "role": "owner", "schedule": {}, "updatedAt": "2026-04-20T08:33:13.943Z"}, "title": "Julien Furic"}, {"employee": {"__v": 7, "_id": "69404c019c31680cd45cf9b6", "contract_end": null, "createdAt": "2025-12-15T17:57:21.449Z", "email": "fu@fu.fu", "first_name": "Furic", "last_name": "De Concarneau", "role": "owner", "schedule": {}, "updatedAt": "2026-02-12T05:52:23.372Z"}, "title": "Furic De Concarneau"}, {"employee": {"__v": 0, "_id": "69404c6a9c31680cd45cf9b9", "contract_end": null, "createdAt": "2025-12-15T17:59:06.923Z", "email": "sy@sy.sy", "first_name": "Chloé", "last_name": "Chataigne", "role": "owner", "schedule": {}, "updatedAt": "2026-02-13T13:23:52.690Z"}, "title": "Chloé Chataigne"}, {"employee": {"__v": 0, "_id": "6940503c9c31680cd45cf9ce", "contract_end": null, "createdAt": "2025-12-15T18:15:24.060Z", "email": "fa@fa.fa", "first_name": "Fanny", "last_name": "Farance", "role": "employee", "schedule": {}, "updatedAt": "2025-12-21T22:41:34.502Z"}, "title": "Fanny Farance"}]

  const [selectedEmployee, setSelectedEmployee]=useState<null | EmployeeItemType>(null)

  return (
    <>
      <GoingBackHeader previousPage="/tab1" previousPageName="Tab 1" />
      <ScrollView style={{ flex: 1, backgroundColor: appStyle.pageBody.backgroundColor }}
        contentContainerStyle={[
          appStyle.pageBody,
          { flex: undefined }
        ]}
        bounces={false}
        keyboardShouldPersistTaps="handled">
        <View style={{ minHeight: 2000 }}>

          <Text style={styles.pageTitle}>Tab 2 !</Text>

          {/* <Autocomplete
          data={employeeList}
          setSelectedItem={setSelectedEmployee}
          selectedItem={selectedEmployee}
          /> */}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    ...appStyle.pageBody,
    justifyContent: 'center',
  },
  pageTitle: {
    ...appStyle.pageTitle,
  },
});
